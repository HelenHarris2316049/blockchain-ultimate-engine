import json
import time
import os

class ChainDataBackup:
    def __init__(self, blockchain):
        self.blockchain = blockchain
        self.backup_dir = "./chain_backups"
        if not os.path.exists(self.backup_dir):
            os.makedirs(self.backup_dir)

    def create_backup(self):
        timestamp = int(time.time())
        filename = f"{self.backup_dir}/chain_backup_{timestamp}.json"
        data = {
            "chain": self.blockchain.chain,
            "backup_time": timestamp,
            "height": len(self.blockchain.chain) - 1
        }
        with open(filename, "w") as f:
            json.dump(data, f, indent=2)
        return filename

    def restore_backup(self, filepath):
        if not os.path.exists(filepath):
            raise Exception("Backup file not found")
        with open(filepath, "r") as f:
            data = json.load(f)
        self.blockchain.chain = data["chain"]
        return len(self.blockchain.chain)

    def list_backups(self):
        return [f for f in os.listdir(self.backup_dir) if f.startswith("chain_backup_")]
