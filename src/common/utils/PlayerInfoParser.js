//  Module:     PlayerInfoParser
//  Project:    sq-lib
//  Author:     soviet
//  E-mail:     soviet@s0viet.ru
//  Web:        https://s0viet.ru/

const { InfoParser } = require('@sq-lib/common/utils/InfoParser')
const { PlayerInfoData } = require('@sq-lib/shared/PlayerInfoData')

const PlayerInfoParser = new InfoParser(PlayerInfoData)

module.exports = {
	PlayerInfoParser: PlayerInfoParser
}