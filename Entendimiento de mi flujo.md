

## Registro

1. El usuario se registra em la pagina /register.
2. Se manda un correo de verificación a dicho usuario.
3. Una vez verificado puede hacer login.
4. Hace login y me guardo el token.

## Conversaciones

Cada usuario tiene un id diferente, por tanto cada usuario va a tener unos chats y servidores diferentes. Para eso tengo que entender lo siguiente:

-> METHOD POST conversation controller: este metodo crea una conversacion a la que le tengo que mandar un senderId y un receiverId, para poder controlar el flujo de mensajes entre ellos.

-> METHOD GET getConversations: esto retorna todas las conversaciones de mi aplicacion.

-> MEHOD GET getConversationsById: esto me retorna las conversaciones de una persona recuperando el ID.


## MENSAJES 1 to 1

-> METHOND POST messageCtrl: Este metodo crea un mensaje y en el body se le pasa el senderId, el text, y conversationId, que es en que chat se va a mandar.

-> METHOD GET conversationCtrl: Esto recupera los mensajes de una conversacion pasandole el conversationId.


## SERVIDORES

-> METHOD GET serversCtrl: Este metodo recupera todos los servidores de mi aplicacion.

-> METHOD POST createServerCtrl : Esto crea un servidor, y se le pasa el nombre del servidor, la foto, y un array vacio llamado members. (Que se inicializara con la persona que lo crea).

-> METHOD GET getServerById: Esto recupera el servidor que se le pasa por parámetro.
-> METHOD POST pushMemberCtrl: Este metodo se pasa por parámetro el id del servidor, y por el body se pasa el usuario para añadirlo en el array vacio de members.

## MENSAJE A SERVIDORES

-> METHOD get getMessageCtrl : Aun no lo tengo configurado.
-> METHOD post createMessageCtrl: Esto creo un mensaje, se pasa el SenderId, el text, y el conversationId que en este caso es el Id del servidor.

-> METHOD getConversationServCtrl: Este recupera las conversaciones de un servidor pasandole por parametros el id del servidor (conversationId)