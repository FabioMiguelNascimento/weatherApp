# Weather App

Aplicação web para visualização de dados meteorológicos utilizando a API do OpenWeather. O app mostra condições climáticas atuais com interface adaptativa baseada no clima.

## Principais Funcionalidades

- Busca de cidades
- Geolocalização automática
- Animações dinâmicas baseadas no clima
- Interface responsiva
- Suporte para português

## Hooks Principais

### useLocation

Hook responsável pela comunicação com a API do OpenWeather:

- `getLocationByCity(city)`: Busca coordenadas geográficas por nome da cidade
- `getLocationByCoords(lat, lon)`: Busca informações de localização por coordenadas
- `getWeather(lat, long)`: Obtém dados meteorológicos atuais para as coordenadas

### useWeather

Hook central que gerencia o estado da aplicação:

- `weatherData`: Dados do clima da cidade pesquisada
- `defaultLocation`: Dados do clima da localização do usuário
- `isLoading`: Estado de carregamento
- `error`: Tratamento de erros
- `searchCity`: Função de busca por cidade
- `getUserLocation`: Função para obter localização do usuário

## Variáveis de Ambiente

```env
VITE_API_KEY=sua_chave_openweather_aqui
```

## Executando o Projeto

```bash
npm install
npm run dev
```
