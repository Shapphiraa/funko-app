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
- Phone number (string)
- Rol (string)
- Collection (array of pops IDs)
- Whislist (array of pops IDs)

#### Image
- ID (string)
- SRC (string)
- Alt (string)
- Width (number)
- Height (number)

#### Pop
- ID (string)
- Variant (string)
- Type (string)
- Name (string)
- Images (array of images IDs)
- Category (string)
- Collection (string)
- Release (string)
- Status (string)
- Trending Value (number)
- Collection (array of users IDs)
- Whislist (array of users IDs)
- User Collection (boolean)
- User Whislist (boolean)

#### Sale Post
- ID (string)
- Author:
    - ID (string)
    - Name (string)
    - Avatar (string)
    - Location (string)
- Tittle (string)
- Description (string)
- Images (array of images IDs)
- Type (string)
- Category (string)
- Price (string)
- Status (string)

### Test Coverage

//Coverage link

## Planning

Notion planning:

https://www.notion.so/57704f1b37cd4f87b74183273bbcdfab?v=4b458dbb9d7943f8a7b11928a4aaff87&pvs=4

## Design

Figma:

https://www.figma.com/file/HMkXmnAVyCGVC4F0D4sI4U/Final-Project?type=design&node-id=0%3A1&mode=design&t=jaQM6iSOOX9ASzop-1