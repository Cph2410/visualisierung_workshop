# Imports
import pandas as pd
import numpy as numpy


# Load File(s)

# Mietpreise
df_Mietpreise_Berlin =  pd.read_excel('./Data/Mietpreise/Mietpreise_Berlin.xlsx')
df_Mietpreise_Dortmund =  pd.read_excel('./Data/Mietpreise/Mietpreise_Dortmund.xlsx')
df_Mietpreise_Duesseldorf =  pd.read_excel('./Data/Mietpreise/Mietpreise_Duesseldorf.xlsx')
df_Mietpreise_Frankfurt =  pd.read_excel('./Data/Mietpreise/Mietpreise_Frankfurt.xlsx')
df_Mietpreise_Hamburg =  pd.read_excel('./Data/Mietpreise/Mietpreise_Hamburg.xlsx')
df_Mietpreise_Koeln =  pd.read_excel('./Data/Mietpreise/Mietpreise_Koeln.xlsx') # Jahr
df_Mietpreise_Muenchen =  pd.read_excel('./Data/Mietpreise/Mietpreise_Muenchen.xlsx')

# Leerstand - Alle Jahr
df_Leerstand_Berlin =  pd.read_excel('./Data/Leerstand/Leerstand_Berlin.xlsx')
df_Leerstand_Dortmund =  pd.read_excel('./Data/Leerstand/Leerstand_Dortmund.xlsx')
df_Leerstand_Duesseldorf =  pd.read_excel('./Data/Leerstand/Leerstand_Duesseldorf.xlsx')
df_Leerstand_Frankfurt =  pd.read_excel('./Data/Leerstand/Leerstand_Frankfurt.xlsx')
df_Leerstand_Hamburg =  pd.read_excel('./Data/Leerstand/Leerstand_Hamburg.xlsx')
df_Leerstand_Koeln =  pd.read_excel('./Data/Leerstand/Leerstand_Koeln.xlsx')
df_Leerstand_Muenchen =  pd.read_excel('./Data/Leerstand/Leerstand_Muenchen.xlsx')

# Immobilienpreise
df_Immobilienpreise_Berlin =  pd.read_excel('./Data/Immobilienpreise/Immobilienpreise_Berlin.xlsx')
df_Immobilienpreise_Dortmund =  pd.read_excel('./Data/Immobilienpreise/Immobilienpreise_Dortmund.xlsx')
df_Immobilienpreise_Duesseldorf =  pd.read_excel('./Data/Immobilienpreise/Immobilienpreise_Duesseldorf.xlsx')
df_Immobilienpreise_Frankfurt =  pd.read_excel('./Data/Immobilienpreise/Immobilienpreise_Frankfurt.xlsx')
df_Immobilienpreise_Hamburg =  pd.read_excel('./Data/Immobilienpreise/Immobilienpreise_Hamburg.xlsx')
df_Immobilienpreise_Koeln =  pd.read_excel('./Data/Immobilienpreise/Immobilienpreise_Koeln.xlsx')
df_Immobilienpreise_Muenchen =  pd.read_excel('./Data/Immobilienpreise/Immobilienpreise_Muenchen.xlsx')


# Zusammenführen der Daten
# Koeln
## Rename Jahr to Quartal and change Format
df_Mietpreise_Koeln = df_Mietpreise_Koeln.rename(columns={'Jahr':'Quartal'})
df_Mietpreise_Koeln = df_Mietpreise_Koeln.rename(columns={'Preis':'Mietpreis'})
df_Mietpreise_Koeln['Quartal'] = 'Q2 ' + df_Mietpreise_Koeln['Quartal'].astype(str)

df_Leerstand_Koeln = df_Leerstand_Koeln.rename(columns={'Jahr':'Quartal'})
df_Leerstand_Koeln = df_Leerstand_Koeln.rename(columns={'Prozent':'Leerstand'})
df_Leerstand_Koeln['Quartal'] = 'Q2 ' + df_Leerstand_Koeln['Quartal'].astype(str)

df_Immobilienpreise_Koeln = df_Immobilienpreise_Koeln.rename(columns={'Preis':'Immobielienpreis'})

df_Koeln = pd.merge(df_Immobilienpreise_Koeln, df_Leerstand_Koeln, how='outer', on='Quartal')
df_Koeln = pd.merge(df_Koeln, df_Mietpreise_Koeln, how='left', on='Quartal')

# Berlin
## Rename Jahr to Quartal and change Format
df_Mietpreise_Berlin = df_Mietpreise_Berlin.rename(columns={'Jahr':'Quartal'})
df_Mietpreise_Berlin = df_Mietpreise_Berlin.rename(columns={'Preis':'Mietpreis'})

df_Leerstand_Berlin= df_Leerstand_Berlin.rename(columns={'Jahr':'Quartal'})
df_Leerstand_Berlin = df_Leerstand_Berlin.rename(columns={'Prozent':'Leerstand'})
df_Leerstand_Berlin['Quartal'] = 'Q2 ' + df_Leerstand_Berlin['Quartal'].astype(str)

df_Immobilienpreise_Berlin = df_Immobilienpreise_Berlin.rename(columns={'Preis':'Immobielienpreis'})

df_Berlin = pd.merge(df_Immobilienpreise_Berlin, df_Leerstand_Berlin, how='outer', on='Quartal')
df_Berlin = pd.merge(df_Berlin, df_Mietpreise_Berlin, how='left', on='Quartal')

# Dortmund
## Rename Jahr to Quartal and change Format
df_Mietpreise_Dortmund = df_Mietpreise_Dortmund.rename(columns={'Jahr':'Quartal'})
df_Mietpreise_Dortmund = df_Mietpreise_Dortmund.rename(columns={'Preis':'Mietpreis'})

df_Leerstand_Dortmund= df_Leerstand_Dortmund.rename(columns={'Jahr':'Quartal'})
df_Leerstand_Dortmund = df_Leerstand_Dortmund.rename(columns={'Prozent':'Leerstand'})
df_Leerstand_Dortmund['Quartal'] = 'Q2 ' + df_Leerstand_Dortmund['Quartal'].astype(str)

df_Immobilienpreise_Dortmund = df_Immobilienpreise_Dortmund.rename(columns={'Preis':'Immobielienpreis'})

df_Dortmund = pd.merge(df_Immobilienpreise_Dortmund, df_Leerstand_Dortmund, how='outer', on='Quartal')
df_Dortmund = pd.merge(df_Dortmund, df_Mietpreise_Dortmund, how='left', on='Quartal')

# Duesseldorf
## Rename Jahr to Quartal and change Format
df_Mietpreise_Duesseldorf = df_Mietpreise_Duesseldorf.rename(columns={'Jahr':'Quartal'})
df_Mietpreise_Duesseldorf = df_Mietpreise_Duesseldorf.rename(columns={'Preis':'Mietpreis'})

df_Leerstand_Duesseldorf= df_Leerstand_Duesseldorf.rename(columns={'Jahr':'Quartal'})
df_Leerstand_Duesseldorf = df_Leerstand_Duesseldorf.rename(columns={'Prozent':'Leerstand'})
df_Leerstand_Duesseldorf['Quartal'] = 'Q2 ' + df_Leerstand_Duesseldorf['Quartal'].astype(str)

df_Immobilienpreise_Duesseldorf = df_Immobilienpreise_Duesseldorf.rename(columns={'Preis':'Immobielienpreis'})

df_Duesseldorf = pd.merge(df_Immobilienpreise_Duesseldorf, df_Leerstand_Duesseldorf, how='outer', on='Quartal')
df_Duesseldorf = pd.merge(df_Duesseldorf, df_Mietpreise_Duesseldorf, how='left', on='Quartal')

# Frankfurt
## Rename Jahr to Quartal and change Format
df_Mietpreise_Frankfurt = df_Mietpreise_Frankfurt.rename(columns={'Jahr':'Quartal'})
df_Mietpreise_Frankfurt = df_Mietpreise_Frankfurt.rename(columns={'Preis':'Mietpreis'})

df_Leerstand_Frankfurt= df_Leerstand_Frankfurt.rename(columns={'Jahr':'Quartal'})
df_Leerstand_Frankfurt = df_Leerstand_Frankfurt.rename(columns={'Prozent':'Leerstand'})
df_Leerstand_Frankfurt['Quartal'] = 'Q2 ' + df_Leerstand_Frankfurt['Quartal'].astype(str)

df_Immobilienpreise_Frankfurt = df_Immobilienpreise_Frankfurt.rename(columns={'Preis':'Immobielienpreis'})

df_Frankfurt = pd.merge(df_Immobilienpreise_Frankfurt, df_Leerstand_Frankfurt, how='outer', on='Quartal')
df_Frankfurt = pd.merge(df_Frankfurt, df_Mietpreise_Frankfurt, how='left', on='Quartal')

# Hamburg
## Rename Jahr to Quartal and change Format
df_Mietpreise_Hamburg = df_Mietpreise_Hamburg.rename(columns={'Jahr':'Quartal'})
df_Mietpreise_Hamburg = df_Mietpreise_Hamburg.rename(columns={'Preis':'Mietpreis'})

df_Leerstand_Hamburg= df_Leerstand_Hamburg.rename(columns={'Jahr':'Quartal'})
df_Leerstand_Hamburg = df_Leerstand_Hamburg.rename(columns={'Prozent':'Leerstand'})
df_Leerstand_Hamburg['Quartal'] = 'Q2 ' + df_Leerstand_Hamburg['Quartal'].astype(str)

df_Immobilienpreise_Hamburg = df_Immobilienpreise_Hamburg.rename(columns={'Preis':'Immobielienpreis'})

df_Hamburg = pd.merge(df_Immobilienpreise_Hamburg, df_Leerstand_Hamburg, how='outer', on='Quartal')
df_Hamburg = pd.merge(df_Hamburg, df_Mietpreise_Hamburg, how='left', on='Quartal')

# Muenchen
## Rename Jahr to Quartal and change Format
df_Mietpreise_Muenchen = df_Mietpreise_Muenchen.rename(columns={'Jahr':'Quartal'})
df_Mietpreise_Muenchen = df_Mietpreise_Muenchen.rename(columns={'Preis':'Mietpreis'})
df_Leerstand_Muenchen= df_Leerstand_Muenchen.rename(columns={'Jahr':'Quartal'})
df_Leerstand_Muenchen = df_Leerstand_Muenchen.rename(columns={'Prozent':'Leerstand'})
df_Leerstand_Muenchen['Quartal'] = 'Q2 ' + df_Leerstand_Muenchen['Quartal'].astype(str)

df_Immobilienpreise_Muenchen = df_Immobilienpreise_Muenchen.rename(columns={'Preis':'Immobielienpreis'})

df_Muenchen = pd.merge(df_Immobilienpreise_Muenchen, df_Leerstand_Muenchen, how='outer', on='Quartal')
df_Muenchen = pd.merge(df_Muenchen, df_Mietpreise_Muenchen, how='left', on='Quartal')

print("Result:")
print(df_Koeln)
df_Koeln.to_csv('./Data/Output/Koeln.csv')
print(df_Berlin)
df_Berlin.to_csv('./Data/Output/Berlin.csv')
print(df_Dortmund)
df_Dortmund.to_csv('./Data/Output/Dortmund.csv')
print(df_Duesseldorf)
df_Duesseldorf.to_csv('./Data/Output/Duesseldorf.csv')
print(df_Frankfurt)
df_Frankfurt.to_csv('./Data/Output/Frankfurt.csv')
print(df_Hamburg)
df_Hamburg.to_csv('./Data/Output/Hamburg.csv')
print(df_Muenchen)
df_Muenchen.to_csv('./Data/Output/Muenchen.csv')