import express from "express"
import morgan from 'morgan';
import {engine} from 'express-handlebars';
import {join, dirname} from 'path'
import {fileURLToPath} from "url"

const app=express();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.set('port',process.env.PORT || 3000);

app.set('views', join(__dirname, 'views'));

app.engine('.hbs', engine({
	defaultLayout: 'main',
	layoutsDir: join(app.get('views'), 'layouts'),
	partialsDir: join(app.get('views'), 'partials'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.get('/', (req, res)=>{
	res.render('index')
})

app.use(express.static(join(__dirname,'public')));

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('CARGANDO EN EL PUERTO', app.get('port'));
});