import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50, // Adjust the padding as needed
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Remove elevation for iOS or adjust as necessary
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  text: {
    fontSize: 16,
    color: '#666666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center', // Centers the text
    marginTop: 20, // Adds space at the top
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Centers the loading spinner vertically
    alignItems: 'center', // Centers the loading spinner horizontally
  },
  detailContainer: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10, // Adds space below the title
    color: '#0047AB', // A shade of blue
  },
  detailText: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 5, // Adds space between text elements
  },
});
