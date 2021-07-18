//  Module:     PacketClient
//  Project:    sq-lib
//  Author:     soviet
//  E-mail:     soviet@s0viet.ru
//  Web:        https://s0viet.ru/

const { Protocol } = require('@sq-lib/shared/Protocol')
const { ProtoDefCompiler, CompiledProtodef } = require('protodef').Compiler

const Compiler = new ProtoDefCompiler()
const ProtocolClient = new CompiledProtodef(
	Compiler.sizeOfCompiler.compile(Protocol.client.sizeOfCode),
	Compiler.writeCompiler.compile(Protocol.client.writeCode),
	Compiler.readCompiler.compile(Protocol.client.readCode)
)

class PacketClient {
	constructor(type, ...data) {
		if(type === undefined)
			return
		this.length = undefined
		this.id = 0
		this.type = type
		this.data = data
	}
	toBuffer() {
		let buffer = ProtocolClient.createPacketBuffer('packet', this)
		this.length = buffer.byteLength - 4
		buffer.writeUInt32LE(this.length, 0)
		return buffer
	}
	static from(buffer) {
		return Object.assign(new this(), {
			... ProtocolClient.parsePacketBuffer('packet', buffer).data,
			... {
				'length': buffer.byteLength - 4
			}
		})
	}
}

module.exports = {
	ProtocolClient: ProtocolClient,
	PacketClient: PacketClient
}