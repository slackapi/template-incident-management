import dotenv from 'dotenv';
dotenv.config();

// tslint:disable:import-name
import createError from 'http-errors';
import express from 'express';
import morgan from 'morgan';

import interactiveComponentsRouter from './routes/interactive_components';
import slashCommandRouter from './routes/slash_command';

// tslint:enable:import-name

const app = express();

// view engine setup
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/interactive_components', interactiveComponentsRouter);
app.use('/slashcommand', slashCommandRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (req.app.get('env') === 'development') {
    console.log(err);
  }
  // render the error page
  // tslint:disable-next-line:strict-boolean-expressions
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
