# Use a imagem base do NGINX
FROM nginx

# Copie os arquivos HTML para um diretório temporário no contêiner
COPY . /tmp/html

# Script de shell para sincronizar os arquivos
RUN \
    # Remove os arquivos HTML que não existem mais
    find /usr/share/nginx/html -type f -exec sh -c 'rm "/usr/share/nginx/html/$(basename "$1")"' _ {} \; && \
    # Copia os novos arquivos HTML ou atualiza os arquivos existentes
    cp -r /tmp/html/* /usr/share/nginx/html/ && \
    # Limpa o diretório temporário
    rm -rf /tmp/html/*