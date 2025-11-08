import json
with open("data/majors.json") as f:
    major_data = json.load(f)
MAJORS_LIST = list(major_data.keys())

def checkMajors(major1, major2):
    error = ""
    if not major1 or not major2:
        error = "Please select both majors before submitting."
    elif major1 not in MAJORS_LIST or major2 not in MAJORS_LIST:
        error = "Please enter a correct major."
    elif major1 == major2:
        error = "Please select two different majors."
    
    return error