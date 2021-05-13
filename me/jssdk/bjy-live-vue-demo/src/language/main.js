/**
 * @file 话术入口
 * @author zhaogaoxing
 */
'use strict'
import * as chinese from './chinese'
// 如有英文话术，在这里引入它
// import * as english from './english'

let language = chinese

// 如需提供英文话术，请使用下边的代码
// let language = BJY.store.get('language') === 'english' ? chinese : english

export default language
