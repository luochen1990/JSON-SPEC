require './prim-object'
require './prim-array'
require './prim-constructor'
{Bool} = require './prim-bool'
{Any} = require './prim-any'
{Enum} = require './prim-enum'
{Maybe} = require './prim-maybe'
{Either} = require './prim-either'
{Dict} = require './prim-dict'
{Map} = require './prim-map'
{Strict} = require './prim-strict'
{Data} = require './prim-data'
{match, show, sample, samples, showHtml, htmlInline, htmlNode} = require './typespec'

style = """
	.typespec {
		font-family: monospace;
		font-size: 16px;
		border-width: 4px;
		border-color: rgba(165, 230, 229, 0.24);
		border-style: ridge;
	}
	.typespec>div, .typespec>pre {
		margin: 0.6em
	}
	.typespec .unfolded>.fold, .typespec .folded>.unfold {
		display: none
	}
	.typespec ul {
		list-style-type: none;
		padding: 0px;
		margin: 0px 0px 0px 2em;
	}
	.typespec .meta-field {
		font-weight: bold;
		color: gray
	}
	.typespec .field-name {
		font-weight: bold;
		color: #87BFB8
	}
	.typespec .fold>.field-name, .typespec .unfold>.field-name {
		cursor: help
	}
	.typespec .type-name {
		color: blue;
		cursor: help
	}
	.typespec .type-maker {
		color: #223497
	}
	.typespec .spliter {
		display: inline-block;
		color: gray;
		padding: 0 0.5em 0 0
	}
	.typespec .type-name~.spliter {
		padding: 0 0.5em
	}
	.typespec .sample pre {
		margin: 0;
		color: green;
		max-height: 10em;
		overflow: auto;
	}
"""

bind = ($) -> (rootSelection) ->
	#console.info rootSelection.find('ul')
	rootSelection.find('ul').each (i, elm) ->
		$(elm).closest('li,.spec').addClass('unfolded').removeClass('folded')
	rootSelection.find('.type-name').each (i, elm) ->
		$(elm).closest('li,.spec').addClass('folded').removeClass('unfolded')
		$(elm).click ->
			$(elm).closest('li,.spec').toggleClass('folded').toggleClass('unfolded')
	rootSelection.find('li').each (i, elm) ->
		$(elm).children('.unfold').children('.field-name').click ->
			$(elm).addClass('folded').removeClass('unfolded')
		$(elm).children('.fold').children('.field-name').click ->
			$(elm).addClass('unfolded').removeClass('folded')

showPage = (t) -> "<style>#{style}</style>" + (showHtml t) +
	"<script src='http://libs.baidu.com/jquery/1.9.0/jquery.js'></script>" +
	"<script>" + "(#{bind.toString()})(jQuery)($('.typespec'))" + "</script>"

init = ($) -> (bind, specs, style) ->
	$('head').append("<style>#{style}</style>")
	$('.typespec-hook').each (i, elm) ->
		$(elm).append(specs[$(elm).attr('it')])
	bind($('.typespec'))

genRenderCode = (entries) ->
	specs = json dict list map(([k, v]) -> [k, (showHtml v)]) enumerate(entries)
	"(#{init.toString()})(jQuery)((#{bind})(jQuery), #{specs}, #{json style})"

module.exports = {
	showPage, genRenderCode
}

if module.parent is null
	require 'coffee-mate/global'
	UserName = Maybe String
	UserInfo = {
		name: UserName
		position: String
		age: Number
	}
	assert -> match(UserName)('luo') is true
	assert -> match(UserName)(1) is false
	log -> show UserName
	#log -> show UserInfo

	TableName = Data
		name: 'TableName'
		spec: String
		samples: ['table1', 'table2']
	FieldName = Data
		name: 'FieldName'
		spec: String
		samples: ['product_id', 'sale', 'amount']
	Comparator = Enum ['=', '<', '<=', '>=', '>']

	WideTable = [{
		tableName: TableName
		join: {
			leftTableName: TableName
			left: FieldName
			op: Comparator
			right: FieldName
		}
	}]

	DimensionName = Data
		name: 'DimensionName'
		spec: String
		samples: ['date', 'product_type', 'city']
	MeasureName = Data
		name: 'MeasureName'
		spec: String
		samples: ['sale', 'profit', 'amount']
	Measure = Data
		name: 'Measure'
		spec: Strict {
			name: MeasureName
			aggregator: Enum ['sum', 'avg', 'max', 'min']
		}
	MemberName = Data
		name: 'MemberName'
		spec: String
		samples: ['2013', '2014', '2015']
	ValueExpr = Data
		name: 'ValueExpr'
		spec: String
		samples: ['sum(sale)']
	ConditionExpr = Data
		name: 'ConditionExpr'
		spec: String
		samples: ['sum(sale) > 100']

	DimensionFilter = Data
		name: 'DimensionFilter'
		spec: Strict {
			select: [MemberName]
			match: Either {
				contains: String
				startWith: String
				endWith: String
			}
			condition: Either {
				limit: Strict {
					measure: Measure
					comparator: Comparator
					value: Number
				}
				expr: ConditionExpr
			}
			top: Strict {
				count: Number
				by: Either {
					measure: Measure
					expr: ValueExpr
				}
			}
		}
	InclusionCondition = Data
		name: 'InclusionCondition'
		spec: Strict {
			via: [DimensionName]
			positions: [[MemberName]]
		}
	ExclusionCondition = Data
		name: 'ExclusionCondition'
		spec: Strict {
			via: [DimensionName]
			positions: [[MemberName]]
		}
	SortCondition = Data
		name: 'SortCondition'
		spec: Strict {
			asc: Bool
			by: Either {
				measure: Measure
				expr: ValueExpr
			}
			where: Maybe ConditionExpr
		}
	Context =
		filter: Strict
			dimensions: Map DimensionName, DimensionFilter
			measures: [Strict {
				measure: Measure
				limit:
					minBound: Maybe Number
					maxBound: Maybe Number
			}]
			inclusions: [InclusionCondition]
			exclusions: [ExclusionCondition]
		sort: Map DimensionName, SortCondition

	#contextSample =
	#	filter: {
	#		dimensions: {
	#			"product_name": {
	#				select: ['mp3', 'mp4']
	#				match: { #either {contains: ..} or {startWith: ..} or {endWith: ..}
	#					contains: 'abc'
	#					startWith: 'abc'
	#					endWith: 'abc'
	#				}
	#				condition: {#either {limit: ...} or {expr: '...'}
	#					limit: {
	#						measure: 'sale'
	#						aggregator: 'sum'
	#						if: {
	#							comparator: '>'
	#							value: 100
	#						}
	#					}
	#				}
	#				top: {
	#					count: 10
	#					by: {#either {field: ...} or {formula: ...}
	#						field: {
	#							measure: 'sale'
	#							aggregator: 'sum'
	#						}
	#					}
	#				}
	#			}
	#		}
	#		measures: [{
	#			measure:
	#				name: 'sale'
	#				aggregator: 'sum'#aggregation type. e.g. 'sum', 'avg', 'item'
	#			limit:
	#				minBound: 10
	#				maxBound: 100
	#		}]
	#		inclusions: [
	#			{
	#				field: ['product type', 'product name']
	#				values: [
	#					['electric appliance', 'mp3']
	#					['electric appliance', 'mp4']
	#				]
	#			}
	#		]
	#		exclusions: [
	#			{
	#				field: ['product type', 'product name']
	#				values: [
	#					['electric appliance', 'mp3']
	#					['electric appliance', 'mp4']
	#				]
	#			}
	#		]
	#	}
	#	sort: {
	#		"product_name": {
	#			asc: true
	#			by: {#either {field: ...} or {formula: ...}
	#				field: {
	#					measure: 'sale'
	#					aggregator: 'sum'
	#				}
	#			}
	#			where: ''
	#		}
	#	}

	log -> json (sample WideTable), 4
	log -> show Context

	fs = require 'fs'
	fs.writeFileSync('test.html', showPage WideTable)

	entries = {
		a: TableName
		b: WideTable
		c: Context
	}

	fs.writeFileSync 'test2.html', """
		<div class='typespec-hook' it='a'></div>
		haha
		<div class='typespec-hook' it='b'></div>
		haha
		<div class='typespec-hook' it='c'></div>
		<script src='http://libs.baidu.com/jquery/1.9.0/jquery.js'></script>
		<script src='./test2.js'></script>
	"""
	fs.writeFileSync('test2.js', genRenderCode entries)

