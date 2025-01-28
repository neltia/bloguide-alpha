from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-US', tz=360)

# build_payload 메소드로 검색어, 시간 범위 등을 설정
pytrends.build_payload(kw_list=['Bitcoin'], timeframe='today 12-m')

# interest_over_time 메소드로 시간에 따른 인기도 데이터를 DataFrame으로 받음
interest_over_time_df = pytrends.interest_over_time()

# 데이터 확인
print(interest_over_time_df)
