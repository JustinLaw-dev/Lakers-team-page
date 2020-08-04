import json
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq



'''Takes players abbreviation and url from json file to be used later'''
def laker_roster():
    with open('laker_players.json') as f:
      data = json.load(f)
    laker_key = list(data.keys())
    laker_url = list(data.values())
    f.close()
    return laker_url, laker_key

'''Gets all the players html from webpage to be used to get stats'''
def get_data(laker_url):
    bball_html = []
    for i in range(len(laker_url)):
        bball_data = uReq(laker_url[i])
        bball_html.append(bball_data.read())
        bball_data.close()
    return bball_html

'''Gets all player individual game stats for entire single season'''
def clean_data(bball_html):
    header_title = []
    strip_data = []
    for i in range(len(bball_html)):
        bball_soup = soup(bball_html[i], 'html.parser')
        bball_table = bball_soup.findAll('table', {'class':'row_summable sortable stats_table'})
        bball_table = bball_table[0]

        headers = bball_table.findAll('thead', {})
        header_titles = []
        for header in headers:
            header_titles.append(header.text)
        header_titles = header_titles[0].strip()
        header_titles = header_titles.split('\n') #TITLE OF COLUMNS
        header_titles = header_titles[1:]
        header_title.append(header_titles)

        all_rows = bball_table.findAll('tbody',{})
        bdata = all_rows[0]
        bdata_stat = bball_table.findAll('tr', {})
        bdata_body = bdata_stat
        stat_text = []
        for bstats in bdata_stat:
            stat_row = []
            bdat = bstats.findAll('td', {})
            for bballstats in bdat:
                stat_row.append(bballstats.text)
            stat_text.append(stat_row)

        stat_text_strip = [x for x in stat_text if x != []]
        strip_data.append(stat_text_strip)
    return strip_data,header_title

'''Write all stats from clean_data into csv files under player abbreviations'''
def write_data(strip_data,header_title,laker_key):
    for x in range(len(laker_key)):
        filename = laker_key[x] + '_data.csv'
        f = open(filename, 'w')

        header_string = 'R,'
        for title in header_title[x]:
            header_string += title + ','
        header_string = header_string[:-1]
        header_string += '\n'

        f.write(header_string)

        for row,i in zip(strip_data[x],range(1,len(strip_data[x])+1)):
            row_string = str(i)+ ','
            for column in row:
                row_string += column + ','
            row = row_string[:-1]
            row_string +='\n'
            f.write(row_string)
        f.close()

'''commands to call functions to run'''
laker_url,laker_key = laker_roster()
bball_html = get_data(laker_url)
strip_data, header_title= clean_data(bball_html)
write_data(strip_data,header_title,laker_key)
