import pandas as pd

def laker_stats():
  data = pd.read_html('https://www.espn.com/nba/team/stats/_/name/lal/los-angeles-lakers')
  frames = [data[0],data[1]]
  team = pd.concat(frames,axis=1)
  frames_2 = [data[2],data[3]]
  advance = pd.concat(frames_2,axis=1)

  team.to_csv('team_stats.csv',index=False)
  advance.to_csv('advance_stats.csv',index=False)

laker_stats()
