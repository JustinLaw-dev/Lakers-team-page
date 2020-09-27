import pandas as pd

def laker_schedule():
    data = pd.read_html('https://www.basketball-reference.com/teams/LAL/2020_games.html')
    schedule = data[0]
    schedule = schedule.drop(schedule.columns[3],axis=1)
    schedule = schedule.drop(schedule.columns[4],axis=1)
    schedule.to_csv('laker_schedule.csv',index=False)

    upcoming_schedule = data[1]
    df = upcoming_schedule[['G','Date','Start (ET)','Opponent']]
    df.to_csv('upcoming_schedule.csv',index=False)

laker_schedule()
