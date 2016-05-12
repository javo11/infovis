import json
import configparser
import csv
from datetime import datetime

def main():
	config = configparser.ConfigParser()
	config.read('heart_rate_config.cfg')
	config = config['config']

	data = []
	with open(config['file_name']) as csvfile:
		data_reader = csv.reader(csvfile)
		oct_date = datetime(2015, 10, 1)
		for row in data_reader:
			hr = int(row[2])
			d = datetime.strptime(row[0], '%d/%m/%y %H:%M')
			if (d >= oct_date and hr > 0):
				data.append({row[0] : hr})

	cal_data = []
	cal_accum_data = {}
	cal_count = {}
	normal_data = []
	exercise_data = []
	all_data = []
	for elem in data:
		for date, hr in elem.items():
			hr = int(hr)
			d = datetime.strptime(date, '%d/%m/%y %H:%M')
			append_data(all_data, d, hr)
			if hr >= int(config['heart_rate_threshold']):
				day = d.strftime('%Y-%m-%d')
				if day in cal_accum_data:
					cal_accum_data[day] = hr + cal_accum_data[day]
					cal_count[day] = cal_count[day] + 1
				else:
					cal_accum_data[day] = hr
					cal_count[day] = 1
				append_data(exercise_data, d, hr)
			elif hr <= int(config['heart_rate_threshold']) - 10:
				append_data(normal_data, d, hr)

	for k, v in cal_accum_data.items():
		hr = v/cal_count[k]
		dic = {}
		dic["date"] = k
		dic["count"] = hr
		cal_data.append(dic)

	cal_data = sorted(cal_data, key=lambda k: k['date'])

	save_data('hr_all_data.json', all_data)
	save_data('hr_normal_data.json', normal_data)
	save_data('hr_exercise_data.json', exercise_data)
	save_data('hr_cal_data.json', cal_data)

def append_data(l, date, hr):
	dic = {}
	dic["Date"] = date.strftime('%Y-%m')
	dic["Heart Rate"] = hr
	l.append(dic)

def save_data(file_name, data):
	with open(file_name, 'w') as outfile:
	 	json.dump(data, outfile)


if __name__ == "__main__":
	main()
