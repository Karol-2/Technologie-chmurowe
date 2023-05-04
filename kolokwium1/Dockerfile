FROM python:latest AS flaskapp
WORKDIR /app
RUN pip install flask
COPY app/app.py .
CMD ["flask","run"]


FROM nginx:latest
ENV PORT=8080
COPY --from=flaskapp /app /app
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]