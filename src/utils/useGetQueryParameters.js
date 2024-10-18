import { useSearchParams } from 'react-router-dom';

export default function useGetQueryParameters(...params) {
  const validParam = (param) =>
    typeof param === 'string' || typeof param === 'number';
  try {
    const [searchParams] = useSearchParams();

    if (params.length === 0) {
      throw new Error(`Nenhum parametro foi passado para realizar a consulta`);
    } else if (params.length >= 1) {
      return params.map((name) => {
        if (validParam(name)) {
          return searchParams.get(name);
        } else {
          throw new Error(
            `O tipo de argumento para funcao getQueryParameters precisa ser um numero ou string. o parametro passado que ocasionou erro é do tipo ${typeof name}`
          );
        }
      });
    }
  } catch (erro) {
    throw new Error(`Erro ao realizar consulta de parametro. Erro: ${erro}`);
  }
}
