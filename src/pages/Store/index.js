import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { useTheme } from '../../context/theme'
import { useAuth } from '../../context/auth'
import Header from '../../components/Header'
import Database from '../../services/Database'

import { MaterialIcons } from '@expo/vector-icons'
import styles from './styles'


function Store() {
    const { theme } = useTheme()
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [storeItems, setStoreItems] = useState([])
    const [userMoney, setUserMoney] = useState(0)
    const [userInventory, setUserInventory] = useState({})

    useEffect(() => {
        Database.getUserInventory(user.uid, (inventory) => {
            setUserInventory(inventory)
        }).then(() => {
            Database.getStoreItemsList().then((storeItemsList) => {
                const auxStoreItems = Object.keys(storeItemsList).map((itemId) => ({ id: itemId, item: storeItemsList[itemId] }))
                
                setStoreItems(auxStoreItems)
            })
        })

        Database.getUserDetails(user.uid, (userDetails) => {
            setUserMoney(userDetails.money)
        })
        
        return () => {
            setLoading(true)
        }
    }, [])

    function handleItemBuy(itemId) {
        Database.buyItemFromStore(user.uid, itemId)
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header
                title="Loja"
                headerRight={(
                    <View style={styles.headerRightContainer}>
                        <Text style={[styles.headerRightText, { color: theme.colors.strongText }]}>{userMoney}</Text>
                        <MaterialIcons name="attach-money" size={28} color={theme.colors.profileMoneyIcon} />
                    </View>
                )}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={[styles.storeContainer, { borderColor: theme.colors.division }]}>
                    {storeItems.length == 0 && (
                        <Text style={[styles.emptyStoreText, { color: theme.colors.lightText }]}>Não foi encontrado nenhum item na loja :(</Text>
                    )}
                    {
                        storeItems.map((itemObject, itemIndex) => (
                            <View key={itemIndex} style={styles.storeItemContainer}>
                                <Image source={{ uri: itemObject.item.media }} style={styles.itemImage}/>
                                <View style={styles.itemInfo}>
                                    <Text style={[styles.itemTitle, { color: theme.colors.strongText }]}>{itemObject.item.name}</Text>
                                    <Text style={[styles.itemDescription, { color: theme.colors.lightText }]}>{itemObject.item.description}</Text>
                                    <RectButton
                                        onPress={() => handleItemBuy(itemObject.id)}
                                        style={[
                                            styles.storeBuyButton,
                                            {
                                                backgroundColor: theme.colors.main
                                            },
                                            userMoney < itemObject.item.price && {
                                                backgroundColor: theme.colors.storeBuyButttonDisabledBackground
                                            },
                                            userInventory[itemObject.id].purchased && {
                                                backgroundColor: theme.colors.tabButtonActiveBackground
                                            }
                                        ]}
                                        enabled={userMoney >= itemObject.item.price && !userInventory[itemObject.id].purchased}
                                    >
                                        {
                                            userInventory[itemObject.id].purchased ? (
                                                <Text style={[styles.purchasedText, { color: theme.colors.strongText }]}>Comprado</Text>
                                            ) : (
                                                <>
                                                    <Text style={[styles.storeBuyButtonText, { color: theme.colors.white }]}>{itemObject.item.price}</Text>
                                                    <MaterialIcons name="attach-money" size={28} color={theme.colors.white} />
                                                </>
                                            )
                                        }
                                    </RectButton>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Store