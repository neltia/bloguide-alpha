# services/trend_service.py
import pandas as pd
from pytrends.request import TrendReq
import traceback

# future behavior 적용하여 경고 방지
pd.set_option('future.no_silent_downcasting', True)


# 구글 트렌드 API를 이용해 특정 키워드의 검색 추이 조회
# - timeframe 예시: 'now 7-d' (마지막 7일), 'today 1-m' (지난 30일) 등
def get_google_trends(keyword: str, timeframe: str = "now 7-d"):
    try:
        # 한국 타겟, 한국 시간대(tz=540)
        pytrends = TrendReq(hl='ko', tz=540)
        pytrends.build_payload(kw_list=[keyword], timeframe=timeframe, geo='KR')

        # interest_over_time() -> pandas DataFrame
        df = pytrends.interest_over_time()
        if df.empty:
            return {
                "keyword": keyword,
                "timeframe": timeframe,
                "data": [],
                "message": "No trend data found."
            }

        # fillna 후 infer_objects() 적용하여 pandas 경고 방지
        df = df.fillna(False).infer_objects(copy=False)

        # df를 json 형식으로 변환
        # df.index가 Timestamp이므로, str로 변환
        trend_data = []
        for idx, row in df.iterrows():
            trend_data.append({
                "date": idx.strftime("%Y-%m-%d"),
                "value": int(row[keyword]) if not row[keyword] is None else 0
            })

        # pytrends.related_queries() 등으로 연관 검색어도 가져올 수 있음
        related_queries = []
        try:
            related = pytrends.related_queries()
            if related and keyword in related:
                ranked_list = related[keyword].get("top", None)
                if ranked_list is not None and not ranked_list.empty:
                    related_queries = ranked_list.head(5).to_dict(orient="records")
        except Exception as e:
            print(f"Error fetching related queries: {e}")

        return {
            "keyword": keyword,
            "timeframe": timeframe,
            "data": trend_data,
            "related_queries": related_queries,
        }
    except pytrends.exceptions.TooManyRequestsError:
        return {
            "keyword": keyword,
            "timeframe": timeframe,
            "data": [],
            "error": 429
        }
    except Exception as e:
        print(traceback.format_exc())
        return {
            "keyword": keyword,
            "timeframe": timeframe,
            "data": [],
            "error": str(e)
        }
