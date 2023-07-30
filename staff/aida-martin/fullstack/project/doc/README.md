# Funko App

## Description

You will be able to view the complete catalog of Funko Pop figures that exist on the market, add them to your collection list or wishlist.

It will be possible to search by category, filter or order by other parameters.

Also, you will be able to know its characteristics (type of pop, year of release, status, trending value...)

<img src='https://i.gifer.com/21Yc.gif' width='100%'> </img>

The 'trade' section will be a space for buying and selling second-hand where you can find figures to buy or sell your own.

You will be able to see the ads and contact the seller or buyer through the chat to agree on the transaction that will be carried out outside the application.

## Funcional description

### Use cases

#### Admin (exclusive)

- Pops CRUD
- All sales posts CRUD

#### User

- View latest releases
- View complete catalog (search, filter, order)
- Manage your collection list
- Manage your whislist
- View sales posts in 'trade' section (search, filter, order)
- Contact the seller through the chat if you wish
- Public your sales posts for sell your pops
- Manage your sales posts (CRUD)

## Technical description

### Data model

#### User
- ID (string)
- Name (string)
- Email (string)
- Password (encrypted string)
- Avatar (string)
- Adress (string)
- Rol (string)
- Collection (array of pops IDs)
- Whislist (array of pops IDs)

#### Pop
- ID (string)
- Variant (string)
- Type (string)
- Name (string)
- Image (string)
- Box Image (string)
- Category (string)
- Collection (string)
- Release (string)
- Status (string)
- Trending Value (number)
- User Collection (boolean)
- User Whislist (boolean)
- Collection (array of users IDs)
- Whislist (array of users IDs)

#### Sales posts
- ID (string)
- Tittle (string)
- Description (string)
- Images (strings)
- Type (string)
- Category (string)
- Price (string)

#### Images
- ID (string)
- SRC (string)
- Type (pop or sale post) (string)

### Test Coverage

//Enlace coverage (barritas verdes)

## Planning

Notion planning:

https://www.notion.so/57704f1b37cd4f87b74183273bbcdfab?v=4b458dbb9d7943f8a7b11928a4aaff87&pvs=4