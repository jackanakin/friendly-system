import platform 
import subprocess  
import threading

class PingThread (threading.Thread):
    def __init__(self, threadID, description, address):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.description = description
      self.address = address
      self.result = -1
    def run(self):
      self.result = create_icmp(self.address)

def create_icmp(address):
    attempts = '3'

    try:
        output_array = []
        process = subprocess.Popen(['ping', '-q', '-c', attempts, address], 
                           stdout=subprocess.PIPE,
                           universal_newlines=True)
        while True:
            output = process.stdout.readline()
            text = output
            if text:
                output_array.append(text)
            return_code = process.poll()
            if return_code is not None:
                for output in process.stdout.readlines():
                    if output:
                        output_array.append(output)
                    pass
                break
        
        avg = int(float(output_array[-1].split(' ')[3].split('/')[1]))
        received = int(output_array[-2].split(',')[1].strip().split(' ')[0])
        loss_ticket = int(attempts) - received
        if loss_ticket != 0:
            loss_ticket *= 5000

        return avg + loss_ticket
    except Exception as e:
        pass
    return -1