import pandas as pd
from matplotlib import pyplot as plt
import json
# import PySimpleGUI as sg

def choose_player():
    with open('player_names.json') as f:
      data = json.load(f)
    laker_key = list(data.keys())
    laker_names = list(data.values())
    print(list(laker_names))
    val = input('Choose player stats you want to graph? ')
    for key,value in data.items():
        if val == value:
            filename = key+'_data.csv'
    return filename,val
    f.close()

def read_data(filename):
    df = pd.read_csv(filename, encoding= 'unicode_escape',
    na_values=['Inactive','Did Not Play', 'Did Not Dress'],index_col=False )
    games = df['G']
    attempts = df['FGA']
    return df,games,attempts

def choose_categories(df):
    print(list(df.columns))
    inputx = input('x-axis category: ')
    inputy = input('y-axis category: ')
    return inputx, inputy

def make_graph(df,inputx,inputy,val):
    plt.style.use('seaborn')
    plt.scatter(df[inputx],df[inputy], c=games, cmap='Greys', edgecolor='black',
            linewidth=1, alpha= 0.6, s=attempts*20)
    plt.title(val + ' ' + inputx + ' VS ' + inputy)
    plt.xlabel(inputx)
    plt.ylabel(inputy)
    plt.xlim(0,max(df[inputx])*1.1)
    plt.ylim(0,max(df[inputy])*1.1)
    cbar = plt.colorbar()
    cbar.set_label('Games Played')
    plt.tight_layout()
    plt.show()


filename,val = choose_player()
df,games,attempts = read_data(filename)
inputx,inputy = choose_categories(df)
make_graph(df,inputx,inputy,val)
