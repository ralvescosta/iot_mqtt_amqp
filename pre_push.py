 
import os

os.system('cd ./mqtt_bridge && yarn test:staged')
os.system('cd ./iot_consumer && yarn test:staged')