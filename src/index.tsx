import '@assets/styles/index.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './App';

const root = document.getElementById('root');
const render = () => ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    root
);

render();

if ((module as any).hot)
    (module as any).hot.accept(() => render());