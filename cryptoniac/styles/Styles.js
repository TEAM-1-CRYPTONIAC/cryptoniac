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
  searchInput: {
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    marginLeft: 10,
  },
  percentChange: {
    fontSize: 16,
    marginLeft: 10,
  },
});
