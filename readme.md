#IngaCode - Test
##Sobre o Projeto
Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor de Software na empresa IngaCode. Ele demonstra a capacidade de construir uma aplicação completa que lida com upload de arquivos, processamento de dados e comunicação assíncrona.

##Funcionalidades
O sistema permite que o usuário faça o upload de um arquivo contendo amostras de métricas. Este arquivo é enviado para o backend, onde as amostras são processadas para identificar inconsistências, ou seja, quais métricas estão fora de um intervalo adequado ou inválidas. As inconsistências detectadas são então enviadas para uma fila do RabbitMQ, garantindo uma notificação eficiente e desacoplada.

##Tecnologias Utilizadas


Frontend:
ReactJS: Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas, foi escolhida por questão de afinidade e ampla documentação.
Backend:
Express: Framework web minimalista e flexível para Node.js, utilizado para construir a API, foi escolhido devido a falta de necessidade de uma ferramenta robusta para desenvolvimento das funcionalidades.
Mensageria:
RabbitMQ: Broker de mensagens que garante a comunicação assíncrona e confiável das notificações de inconsistências.
Status do Projeto
O projeto encontra-se em desenvolvimento ativo. Novas melhorias e funcionalidades podem ser adicionadas futuramente.

##Como Rodar o Projeto
Para executar o projeto IngaCode - Test em sua máquina local, siga os passos abaixo.

###Pré-requisitos
Certifique-se de ter os seguintes softwares instalados em sua máquina:

Node.js (versão LTS recomendada)
npm ou Yarn (gerenciador de pacotes do Node.js)
RabbitMQ (servidor de mensageria configurado e em execução)
Configuração e Instalação
Clone o Repositório:

Bash

git clone https://github.com/marcelo-magalhaes/ingacode-test.git
cd IngaCode-Test

Instale as Dependências do Backend:
Navegue até a pasta do backend e instale as dependências.


cd backend
npm install
Instale as Dependências do Frontend:
npm run dev

###Exemplo de .env no backend
PORT=3333
NODE_ENV=development
QUEUE_USER=guest
QUEUE_PASSWORD=guest
QUEUE_URL=localhost
QUEUE_PORT=5672


cd ../frontend
npm install
npm run start

Para acessar o frontend basta acessar http://localhost:3000




Uso
Após iniciar o frontend e o backend, acesse a URL do frontend no seu navegador. Você deverá ver uma interface para realizar o upload do arquivo de métricas. Selecione o arquivo e envie. O sistema processará e notificará o RabbitMQ sobre quaisquer inconsistências.

Para verificar as mensagens no RabbitMQ, você pode usar a interface de gerenciamento do RabbitMQ (geralmente em http://localhost:15672) ou um consumidor de fila que você tenha configurado.

Contribuição
No momento, este projeto é focado na avaliação para a vaga da IngaCode. Contribuições externas não estão sendo ativamente aceitas. No entanto, se você tiver sugestões ou encontrar algum problema, sinta-se à vontade para abrir uma Issue no repositório.

Autor
Marcelo Magalhães

Licença
Este projeto não possui uma licença definida explicitamente no momento, mas é de uso para fins de avaliação.

##Considerações sobre o projeto

O projeto não está finalizado 100%, ficaram faltando:

->Processamento assíncrono com uso de processamento paralelo
->Verificação de anomalias com uso de algum algoritmo (talvez fosse melhor ter implementado o backend com python para ter bibliotecas para isso)

->Gerar todos gráficos corretamente