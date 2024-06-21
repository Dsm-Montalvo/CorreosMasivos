import bcrypt from 'bcrypt'

const usuarios =[
    {
        nombre:'juan',
        email:'admin@admin.com',
        confirmado:'1',
        password: bcrypt.hashSync('123456',10)
    }
]

export default usuarios