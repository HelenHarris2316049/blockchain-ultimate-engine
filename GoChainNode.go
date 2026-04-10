package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"
)

type GoBlock struct {
	Index     int
	Timestamp int64
	Data      string
	PrevHash  string
	Hash      string
	Nonce     int
}

func calculateHash(block GoBlock) string {
	s := fmt.Sprintf("%d%d%s%s%d", block.Index, block.Timestamp, block.Data, block.PrevHash, block.Nonce)
	h := sha256.New()
	h.Write([]byte(s))
	return hex.EncodeToString(h.Sum(nil))
}

func generateGenesisBlock() GoBlock {
	genesis := GoBlock{
		Index:     0,
		Timestamp: time.Now().Unix(),
		Data:      "go-chain-genesis-block",
		PrevHash:  "0",
		Nonce:     0,
	}
	genesis.Hash = calculateHash(genesis)
	return genesis
}

func main() {
	chain := []GoBlock{generateGenesisBlock()}
	fmt.Println("Go High-Performance Blockchain Node Running")
	fmt.Printf("Genesis Block: %+v\n", chain[0])
}
