# race-map

### Caracteristicas de la Solicitud

#### Terminadas

1. La interfaz debe mostrar:
   1.1) Un mapa de Google Maps
   1.2) Un recuadro donde se listan los bots.
2. El número inicial de bots que empiezan en la competencia debe ser un número aleatorio entre 5 y 10.
3. Los bots se mueven en dirección al punto marcado por el usuario como meta.
4. Cada bot tiene una batería que dura 100 unidades, y cada cambio de posición gasta un número aleatorio entre 10 y 30 unidades
5. Cuando un bot quede sin batería debe detenerse por 6 segundos para volver a empezar con 100 unidades.
6. La interfaz debe mostrar de manera fácil el estado de toda la competencia, estado de los bots, posición de cada uno, distancia hacia la meta y todo lo que considere útil para el usuario (Los datos ya estan disponibles al igual que la tabla para mostrarlos, solo se requiere conectar ambos)
7. Se debe mostrar un botón “Agregar nuevo Bot”, que al presionarse incrementa en 1 el número de bots en competencia. Al agregarse, se ubica de manera aleatoria en la ciudad y de inmediato inicia su trayecto a la meta
8. Cada bot solo puede hacer un movimiento cada 1 segundo de una distancia aleatoria entre 50 y 100 metros.

#### Iniciadas

9. Extraer funciones de moviento del Makerbot

#### Sin implementar

10. El bot que esté más cerca a la meta debe mostrarse con color verde. El último con color rojo, y el resto con color amarillo.
11. Alojar la prueba en algún servicio de tal manera que nos puedas enviar la url para nosotros visualizarlo en funcionamiento.
