import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt


url = "https://en.wikipedia.org/wiki/University_of_Calgary"

#--------------------------------------
# 2. Crawl the UoC Wikipedia webpage
#---------------------------------------

try:
    response = requests.get(url)
    response.raise_for_status() # Ensures the request was successful
    soup = BeautifulSoup(response.text, 'html.parser')
    print(f"Successfully fetched content from {url}")
except Exception as e:
    print(f"Error fetching content: {e}")

# print(soup.prettify()) # Shows the html elements returned by soup 



#--------------------------------
# 3. Data Analysis
#--------------------------------

headings = [f"h{i}" for i in range (1, 7)]
num_headings = len(soup.find_all(headings))

num_links = len(soup.find_all("a"))

num_paragraphs = len(soup.find_all("p"))


print("-------------------------")
print("Data Analysis")
print(f"Number of headings (<h1> to <h6>): {num_headings}")
print(f"Number of links (<a> tags): {num_links}")
print(f"Number of paragraphs (<p> tags): {num_paragraphs}")
print("-------------------------")


#-----------------------
# 4. Keyword Analysis
#-----------------------

text = soup.get_text()

keyword = input("\nEnter Keyword to count: ")

keyword_count = text.count(keyword)

print("-------------------------")
print(f"Keyword({keyword}) appears {keyword_count} number of times ")
print("-------------------------")



#-------------------------------
# 5. Word Frequency Analysis
#-------------------------------

words = soup.get_text().split()
filtered_words = [word for word in words if word.isalpha()]

word_freq = {}  # Dictionary to store word and their occrances

for word in filtered_words:
    if word in word_freq:
        word_freq[word] += 1
    else:
        word_freq[word] = 1

top_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
top_5 = top_words[:5]

print("-------------------------")
print("Top 5 Most Frequent Words:")
for word, count in top_5:
    print(f"{word}: {count} times")
print("-------------------------")




#--------------------------------------
# 6. Finding the Longest Paragraph
#--------------------------------------

paragraphs = soup.find_all("p")
longest_paragraph = ""
max_words = 0
for p in paragraphs:
    paragraph_text = p.get_text().strip()
    word_count = len(paragraph_text.split())
    if word_count >= 5 and word_count > max_words:
        longest_paragraph = paragraph_text
        max_words = word_count


print("-------------------------")
print("Longest Paragraph:")
print(longest_paragraph)
print(f"Number of words: {max_words}")
print("-------------------------")

#---------------------------------
# 7. Visualizing Results
#---------------------------------

labels = ['Headings', 'Links', 'Paragraphs']
values = [num_headings, num_links, num_paragraphs]
plt.bar(labels, values)
plt.title('Put your Group# Here')
plt.ylabel('Count')
plt.show()