//mostra esconde propaganda
var alteraPropaganda = function(event){
	event.preventDefault();

	$('.propaganda').toggle();
	$('.altera-propaganda').toggle();
};

//função que cria propaganda
var umaPropaganda = function(){
	var propagandas = [	'Que tal comprar um carro?',
						'Que tal comprar uma bike?',
						'Que tal comprar uma moto?',
						'que tal comprar um vídeo-game?'
					];
	var randon = Math.floor(propagandas.length * Math.random());
	var texto = propagandas[randon];
	var tr = $('<tr>').addClass('propaganda').append('<td>');
	tr.find('td').attr('colspan', 6).text(texto);
	return tr;
};

//função para calcular valores e quantidade de itens
var atualizaDados = function(){
	var carrinhos = $('.carrinho');
	carrinhos.each(function(){
		var carrinho = $(this);
		var itens = carrinho.find('.item-total:visible');
		var total = 0;

		for(var i = 0; i < itens.length; i++) {
			var item = $(itens[i]);
			var valor = parseFloat(item.text());
			total += valor;
		}

		carrinho.find('.valor-total').text(total);
		carrinho.find('.total-de-itens').text(itens.length);
	});
};

// função para sumir com a linha desejada
var removeItem = function(event){
	event.preventDefault();
	
	var tr = $(this).closest('tr');
	tr.hide();
	atualizaDados();
};

//função UNDO para retornar na exclusão
var undo = function(){
	var carrinho = $(this).closest('.carrinho');
	carrinho.find('tr:visible').removeClass('undo');

	var trs = carrinho.find($('tr:hidden'));
	trs.addClass('undo').show();
	atualizaDados();
};

//função para manipular hover das linhas das listas dos carrinhos
var destaque = function () {
	$(this).toggleClass('hovering');
	$(this).find('.remove-item').toggleClass('troca-cor');
};

//função carregada após load da página
var aposLoad = function(){
	atualizaDados();
	$('.remove-item').click(removeItem);
	$('.btn-undo').click(undo);
	$('.carrinho').each(function(){
		$(this).find('tr:nth-child(3n)').each(function(){
			umaPropaganda().insertAfter($(this));
		});
	})

	$('.altera-propaganda').click(alteraPropaganda);
	$('tbody tr:not(.propaganda)').hover(destaque);
};

// inicializa o jQuery inicial da página
$(aposLoad);