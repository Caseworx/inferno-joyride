import Inferno from 'inferno';
import App from './src/App';

export function renderApp(RootComponent) {
  const target = document.getElementById('react');

  /* istanbul ignore if */
  if (target) {
    Inferno.render(
      <RootComponent />,
      target
    );
  }
}

renderApp(App);

/* istanbul ignore next  */
if (module.hot) {
  module.hot.accept(
    './src/App',
    () => renderApp(require('./src/App').default)
  );
}
