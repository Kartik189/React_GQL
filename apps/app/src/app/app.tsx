import { Component } from "react";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache()
});

const Students = gql`
  query allSets {
    allSets{
      id,
      name
    }
  }
`;

const AddStudent = gql`
  mutation addSet {
    addSet(name: "Poonam Sareen") {
      id
  }
  }
`;

class App extends Component {

  render() {
    return(
      <ApolloProvider client={client}>
        <div>
          <h2>Connecting React and GraphQl using Apollo</h2>
          <div>
            <StudentsData />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

function StudentsData() {
  const { loading, error, data } = useQuery(Students);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allSets.map(({ id, name }) => (
    <div key={id}>
      <p>
        {id} : {name}
      </p>
    </div>
  ));
}

export default App;
