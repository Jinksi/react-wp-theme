var App = React.createClass({
  getInitialState: function(){
    return {
      posts: [
        {
          id: '1',
          title: 'Title',
          content: 'Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
        },
        {
          id: '2',
          title: 'Post',
          content: 'Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
        },
        {
          id: '3',
          title: 'Three',
          content: 'Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
        }
      ]
    };
  },
  render: function(){
    return (
      <div className="app-container banner">
        <Header />
        <Content posts={this.state.posts}/>
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

var Content = React.createClass({
  render: function(){
    var renderPosts = this.props.posts.map(function(post){
      return (
        <Post post={post} key={post.id} />
      );
    });
    return (
      <div className="posts container">
        {renderPosts}
      </div>
    );
  }
});
var Post = React.createClass({
  render: function(){
    return (
      <div className="post">
        <h4 className="title">{this.props.post.title}</h4>
        <p>{this.props.post.content}</p>
      </div>
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


ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
