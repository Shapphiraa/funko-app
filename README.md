# Funko App

## Description

You will be able to view the complete catalog of Funko Pop figures that exist on the market, add them to your collection list or wishlist.

It will be possible to filter by category or search by pop name.

Also, you will be able to know its characteristics (type of pop, year of release, status, trending value...)

![](https://github.com/Shapphiraa/isdi-parttime-202303/blob/feature/fullstack/staff/aida-martin/fullstack/project/doc/deadpool.gif)

The 'trade' section will be a space for buying and selling second-hand where you can find figures to buy or sell your own.

You will be able to see the ads and see the seller contact info to agree on the transaction that will be carried out outside the application.

## Funcional description

### Use cases

#### Login not required

##### User

- View latest pop releases
- View complete catalog (search by name and filter by category)
- View all sale pops in 'trade' section

#### Required login

##### Admin (exclusive)

- Pops CRUD
    - Create a new pop
    - Edit an existing pop
    - Delete an existing pop

##### User

- View their profile and update their information and avatar

- Manage their lists (collection and whislist)
    - View the amount of pops added
    - View a preview of the latest pop added
    - Add pop to list
    - Remove pop from list

- View their available or reserved sale pops into profile
- Manage their sale pops CRUD
    - Create a new sale pop
    - Change status to available, reserved or sold
    - Edit existing sale pop characteristics
    - Delete an existing sale pop
- View seller contact info into available sale pop

### UI design

Figma:

https://www.figma.com/file/HMkXmnAVyCGVC4F0D4sI4U/Final-Project?type=design&node-id=0%3A1&mode=design&t=jaQM6iSOOX9ASzop-1

## Technical description

### Data model

#### User
- id (oid)
- name (string)
- email (string)
- password (encrypted string)
- avatar (string)
- location (string) (spain provinces)
- phoneNumber (string)
- role (string)  ('admin' | 'user')
- popCollect ([oid refers Pop])
- popWhislist ([oid refers Pop])

#### Category
- id (oid)
- name (string)
- slug (string)
- imageList (string)
- imageDetail (string)

#### Pop
- id (oid)
- variant (string) ('POP!'
      | 'POP! DELUXE'
      | 'POP! MOMENT'
      | 'POP! RIDE'
      | 'POP! 2-PACK'
      | 'POP! SUPER'
      | 'POP! JUMBO'
      | 'POP! COVER'
      | 'POP! ALBUM'
      | 'POP! MOVIE POSTER'
      | 'POP! TRAIN')
- exclusivity (string) ('Exclusive' | 'Regular')
- name (string)
- number (string)
- images ([string])
- category (oid refers Category)
- collect (string)
- release (string)
- availability (string) ('Coming Soon' | 'Available' | 'Temporarily Unavailable' | 'Vaulted')
- trendingValue (number)
- userCollect (boolean)
- userWhislist (boolean)
- date (date)


#### Sale Pop
- id (oid)
- author: (oid refers User)
- description (string)
- condition (string) ('Never opened', 'Good condition', 'Figure with defects', 'Box with defects', 'Flawed')
- pop (oid refers Pop)
- images ([string])
- date (date)
- price (number)
- status (string) ('Available', 'Reserved', 'Sold')


### Test Coverage

http://127.0.0.1:5500/aida-martin/fullstack/project/app/coverage/index.html

## Planning

Notion:

https://www.notion.so/57704f1b37cd4f87b74183273bbcdfab?v=4b458dbb9d7943f8a7b11928a4aaff87&pvs=4

## Upcoming implementations

### Use cases

#### Admin (exclusive)

- Improve admin access and create a backoffice

- Categories CRUD
    - Create a new category
    - Edit an existing category
    - Delete an existing category

- All user's sale pops and users
    - Delete if they violate any rule (implement rules)

#### User

- Filter pops by other parameters too

- View general trending value of their lists
- Create other custom lists

- View all sale pops ordered by proximity, search and filter there
- By changing the sale pop status to sold, provide the real selling price (to improve pop trending value)
- View their sold sale pops in other section
- Add more than two images to the sale pops
- To be able to contact sellers through a chat and purchase transaction within the application
- Sale pop shipping options
- View other user's profile
- Reviews

- Switch to dark theme

### Data model

- Independent image model with id
