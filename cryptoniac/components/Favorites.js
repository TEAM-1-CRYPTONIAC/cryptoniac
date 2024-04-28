import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { FavouriteContext } from '../context/FavouritesContext';
import { useNavigation } from '@react-navigation/native';

const FavoritesPage = () => {
  const { theme } = useTheme();
  const { favourites, removeFavourite } = useContext(FavouriteContext);
  const navigation = useNavigation();

  return (
    <View style={theme.container}>
  
      {favourites.length > 0 ? (
        <>
        <Text style={[theme.title, {marginLeft: 18}]}>Press on a coin to see the details</Text>
          <FlatList
            data={favourites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={theme.item}
                onPress={() => navigation.navigate('CryptoDetail', { cryptoId: item.id })}
              >
                <Text style={theme.title}>{item.name} ({item.symbol})</Text>
              
                <Text style={theme.infoText}>{/* {'$' + (item?.quote?.USD?.price.toFixed(2) ?? 'N/A')} */}</Text>
                <TouchableOpacity
                  onPress={() => removeFavourite(item.id)}
                  style={theme.removeButton}
                >
                  <Text style={{color: 'red', fontWeight: 'bold'}}>Remove</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
      </>
      ) : (
        <Text style={theme.noFavourites}>No favorites added yet.</Text>
      )}
      
    </View>
    
  );
};

export default FavoritesPage;
