var App = React.createClass({
  render: function(){
    return (
      <div className="app-container banner">
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
});

var Header = React.createClass({
  render: function(){
    return (
      <header className="header">
        <div className="container">
          <h1>Header</h1>
        </div>
      </header>
    );
  }
});

var Footer = React.createClass({
  render: function(){
    return (
      <footer className="footer">
        <div className="container">
          <h1>Footer</h1>
        </div>
      </footer>
    );
  }
});

var Content = React.createClass({
  render: function(){
    return(
      <div className="container">
        <h1>Content</h1>
      </div>
    );
  }
});
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
