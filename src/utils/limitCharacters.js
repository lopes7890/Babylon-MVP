// const frase =
//   'The Twilight of the Idols; or, How to Philosophize with the Hammer. The Antichrist: Complete Works, Volume Sixteen';

// Função principal
function limitCharacters(frase = 'Não definido', maximo = 64) {
  const total = frase.length;

  // Não modificar a frase se ela for menor que o tamanho maximo
  if (total <= maximo) return frase;

  // Definindo o ponto de corte da palavra com ponto inicial a partir de 10 letras abaixo do numero maximo
  const pontoCorte = frase.indexOf(' ', maximo - 10);

  // cortando a frase
  const novaFrase = frase.slice(0, pontoCorte);

  // Verificar se o corte foi feito onde é possivel adicionar tres pontos (...). Essa funcao é importante, sem ela, algumas frases serao retornadas com tres pontos após uma virgula.
  const cortePreciso = verificarUltimoCaractere(novaFrase);
  return cortePreciso;
}

// Funcao para validar se um caractere é uma letra
function validarCaractere(letra) {
  const regex = /^[A-Za-z]$/;
  return regex.test(letra);
}

// Funcao para remover o caractere final caso nao seja uma letra
function verificarUltimoCaractere(frase) {
  const quantidade = frase.length;
  let finalizado = false;

  frase = frase.split('').reverse();

  const novaFrase = frase
    .reduce((acu, ele, index) => {
      if (validarCaractere(ele) && !finalizado) {
        finalizado = true;
        return frase.slice(index);
      } else {
        acu.unshift;
        return acu;
      }
    }, frase)
    .reverse()
    .join('')
    .concat('...');

  return novaFrase;
}

export default limitCharacters;
