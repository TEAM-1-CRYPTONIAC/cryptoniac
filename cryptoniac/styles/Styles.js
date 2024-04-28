import { StyleSheet } from 'react-native';

const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: '5 %', // Adjust the padding as needed
  },
  item: {
    backgroundColor: '#f8fcff',
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
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  searchInput: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  priceChangeText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
    backgroundColor: '#000',
  },
  chartBackground: {
    color: '#ffffff'
  },
  detailTitle: {
    fontSize: 24,
    margin: 10,
  },
  detailText: {
    fontSize: 18,
    color: '#333',
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
  priceBox: {
    marginBottom: 20
  },
  detailPrice: {
    fontSize: 18,
    marginVertical: 4,
    color: '#333',

  },
  percentChange: {
    fontSize: 18,
    marginBottom: 5,
  },
  touchableOpacity : {
    backgroundColor: '#f8fcff',
    padding: 20,
    marginBottom: 30,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  touchableOpacityText: {
    fontSize: 22,
    textAlign: 'center',
  },
  infoText: {

    fontSize: 16
  },
  cryptoniac: {
    marginTop: '90%',
    fontSize: 19,
    textAlign: 'center'
  },
  favouriteButton: {
    backgroundColor: '#312f31',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  favouriteButtonText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  noFavourites: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginTop: '50 %'
  }
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
    color: '#e1dfdf',
    borderBottomColor: '#e1dfdf'
  },
  detailText: {
    ...lightTheme.detailText,
    color: '#e1dfdf'
  },
  detailPrice: {
    ...lightTheme.detailPrice,
    color: '#e1dfdf'
  },
  touchableOpacity : {
    ...lightTheme.touchableOpacity,
    backgroundColor:'#3a3939'
  },
  touchableOpacityText: {
    ...lightTheme.touchableOpacityText,
    color: '#f4f1f1'
  },
  infoText: {
    ...lightTheme.infoText,
    color: '#a7a7a7'
  },
  cryptoniac: {
    ...lightTheme.cryptoniac,
    color: '#a7a7a7'
  },
  favouriteButton: {
    ...lightTheme.favouriteButton,
    backgroundColor: '#3a3939'
  },
  favouriteButtonText: {
    ...lightTheme.favouriteButtonText,
    color: '#e9e6e6'
  },
  noFavourites: {
    ...lightTheme.noFavourites,
    color: '#e0e6e6'
  }

})

export {lightTheme, darkTheme}