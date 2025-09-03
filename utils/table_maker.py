import requests
from bs4 import BeautifulSoup
import json
from pathlib import Path
import regex as re

def load_majors():
    json_path = Path("data/majors.json")
    with open(json_path, 'r') as f:
        return json.load(f)
MAJORS = load_majors()

# Scrapes a UCI major catalogue for course table
# @param major catalogue website
# @return HTML table text
def getRows(major : str) -> list:
    website = MAJORS[major]
    r = requests.get(website)
    soup = BeautifulSoup(r.text, 'html.parser')
    course_table = soup.find('table', class_ ='sc_courselist')
    rows = course_table.find_all('tr')
    return rows
    
# Converts and filters HTML scrape text for processing into lists
# @param website catalogue of a major
# @return table list (with headers) and course list (without headers)
def makeTableList(major : str) -> (list | list):
    rows = getRows(major)

    table_list = []
    # course_list = []
    
    pattern = re.compile(r"^(.*\S)\s+(\S+)$")
    for row in rows:
        cols = row.find_all('td')
        first_col = cols[0].get_text(strip=True).replace("\xa0", " ")
        if len(cols) == 1:
            table_list.append(first_col)
        else:
            title = cols[1].get_text(strip=True)
            if "-" in first_col:
                match = pattern.match(first_col)
                school, codes = match.groups()
                codes = codes.split("-")
                titles = title.split("and ")

                for i in range(len(codes)):
                    table_list.append(f"{school} {codes[i]} : {titles[i]}")
                    # course_list.append(f"{school} {codes[i]} : {titles[i]}")
            else:
                table_list.append(first_col + " : " + title)
                # course_list.append(first_col + " : " + title)
    return table_list
    
