import requests

def get_chatbot_response(message):
    if message[:2] != '!!':
        return ''

    points, command, args = message.split(' ', 2)
    if command == 'about':
        return 'This is a chat room to discuss random things in a spacey environment.'
    elif command == 'help':
        return 'Available commands: !! about ->  descriptions of the chat room !! help ->  lists available chatbot commands  !! add <num> <num> ->  add two integers together !! sub <num> <num> -> subtract two integers  !! divide <num> <num> ->  divide two integers  !! say <text> -> the chatbot repeats the text input by the user  !! <text> ->  chatbot will have a conversation with you '
    elif command == 'add':
        num1, num2 = args.split()
        return int(num1) + int(num2)
    elif command == 'sub':
        num1, num2 = args.split()
        return int(num1) - int(num2)
    elif command == 'divide':
        num1, num2 = args.split()
        if num2 == 0:
            return 'Unable to divide by zero'
        else:
            return int(num1) / int(num2)
    elif command == 'say':
        return args
    else:
        response= requests.get('https://www.cleverbot.com/getreply?key=' + os.getenv['cleverbot_api'] +'&input=' + args)
        json= response.json()
        return json['output']
        
