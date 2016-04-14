import json
import configparser

def main():
	config = configparser.ConfigParser()
	config.read('heart_rate_config.cfg')
	config = config['config']

	with open(config['file_name']) as data_file:
		data = json.load(data_file)

	normal_data = [elem for elem in data if elem['Heart Rate'] < int(config['heart_rate_threshold'])]
	save_data(config['file_name'].split('.')[0] + '_normal.json', normal_data)
	exercise_data = [elem for elem in data if elem['Heart Rate'] >= int(config['heart_rate_threshold'])]
	save_data(config['file_name'].split('.')[0] + '_exercise.json', exercise_data)

def save_data(file_name, data):
	with open(file_name, 'w') as outfile:
	 	json.dump(data, outfile)


if __name__ == "__main__":
	main()