import os

os.system('cd ./mqtt_bridge && yarn test:cov')
os.system('cd ./iot_consumer && yarn test:cov')