import { StyleSheet } from 'react-native';

const lightTheme = StyleSheet.create({
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
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '83%'
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
  searchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#f6eded'
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  percentChange: {
    fontSize: 18,
    marginBottom: 5,
  },
});

const darkTheme = StyleSheet.create({
  ...lightTheme,
  container: {
    ...lightTheme.container,
    backgroundColor: '#000000'
  },
  item: {
    ...lightTheme.item,
    backgroundColor: '#312f31',
    shadowColor: '#fff'
  },
  title: {
    ...lightTheme.title,
    color: '#d6d6d6'
  },
  searchInput: {
    ...lightTheme.searchInput,
    backgroundColor: '#626262',
    borderColor: '#000000'
  },
  searchView: {
    ...lightTheme.searchView,
    backgroundColor: '#000000'
  },
  price: {
    ...lightTheme.price,
    color: '#a7a7a7'

  },
  icon: {
    ...lightTheme.icon,
    color: '#a7a7a7'
  },
  detailContainer: {
    ...lightTheme.detailContainer,
    backgroundColor: '#000000'
  },
  detailTitle: {
    ...lightTheme.detailTitle,
    color: '#e1dfdf'
  },
  detailText: {
    ...lightTheme.detailText,
    color: '#a7a7a7'
  },
  detailPrice: {
    ...lightTheme.detailPrice,
    color: '#a7a7a7'
  }

})

export {lightTheme, darkTheme}