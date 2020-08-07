import pandas as pd
from matplotlib import pyplot as plt
import json
import PySimpleGUI as sg
import numpy as np

def choose_player():
    with open('player_names.json') as f:
      data = json.load(f)
    laker_key = list(data.keys())
    laker_names = list(data.values())
    choices = laker_names

    layout = [  [sg.Text('What player you want to graph?')],
            [sg.Listbox(choices, size=(15, len(choices)), key='_players_')],
            [sg.Button('Ok')]  ]

    window = sg.Window('Pick a player', layout)

    while True:                  # the event loop
        event, values = window.read()
        if event == sg.WIN_CLOSED:
            break
        if event == 'Ok':
            if values['_players_']:    # if something is highlighted in the list
                val = values['_players_']
                break

    window.close()

    val = str(val).strip('[]')
    for keys,value in data.items():
        if val[1:-1] == value:
            filename = keys+'_data.csv'
    return filename,val
    f.close()

def read_data(filename):
    df = pd.read_csv(filename, encoding= 'unicode_escape',
    na_values=['Inactive','Did Not Play', 'Did Not Dress'],index_col=False)
    games = df['G']
    attempts = df['FGA']
    return df,games,attempts

def choose_categories(df):

    choices = list(df.columns)

    layout = [  [sg.Text('What categories you want to compare?',size=(30,1),
                    justification ='center')],
            [sg.InputCombo(choices, size=(20, 1),tooltip='x-axis', key='-x-axis-'),
                sg.InputCombo(choices, size=(20,1),tooltip='y-axis', key='-y-axis-')],
            [sg.Button('Submit')]  ]

    window = sg.Window('Pick a category', layout)

    while True:                  # the event loop
        event, values = window.read()
        if event == sg.WIN_CLOSED:
            break
        if event == 'Submit':
            if values['-x-axis-'] and values['-y-axis-']:    # if something is highlighted in the list
                inputx = values['-x-axis-']
                inputy = values['-y-axis-']
                break

    window.close()
    return inputx, inputy

def make_graph(df,inputx,inputy,val):
    plt.style.use('seaborn')
    plt.scatter(df[inputx],df[inputy], c=games, cmap='Greys', edgecolor='black',
            linewidth=1, alpha= 0.6, s=attempts*20)
    plt.title(val + ' ' + inputx + ' VS ' + inputy)
    plt.xlabel(inputx)
    plt.ylabel(inputy)
    plt.xlim(0,(df[inputx].max())*(1.1))
    plt.ylim(0,(df[inputy].max())*(1.1))
    cbar = plt.colorbar()
    cbar.set_label('Games Played')
    plt.tight_layout()
    plt.show()


filename,val = choose_player()
df,games,attempts = read_data(filename)
inputx,inputy = choose_categories(df)
make_graph(df,inputx,inputy,val)
