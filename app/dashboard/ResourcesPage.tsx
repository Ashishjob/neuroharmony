// ResourcesPage.tsx
import React from 'react';

// Sample data
const resources = [
  { 
    title: 'Neurodiversity Hub', 
    description: 'Offers a comprehensive overview of neurodiversity, resources for students, employers, and advocates, and a vibrant community forum.', 
    link: 'https://www.neurodiversityhub.org/' 
  },
  { 
    title: 'NeuroClastic', 
    description: 'A platform dedicated to amplifying autistic voices, with insightful articles, personal narratives, and resources for self-discovery and advocacy.', 
    link: 'https://neuroclastic.com/' 
  },
  { 
    title: 'Embrace Autism', 
    description: 'Provides information, support, and resources for individuals with autism and their families, including assessment tools and community-building resources.', 
    link: 'https://embrace-autism.com/' 
  },
  { 
    title: 'ASAN (Autistic Self Advocacy Network)', 
    description: 'A leading organization advocating for the rights and interests of autistic people, offering resources, training, and support for individuals and families.', 
    link: 'https://autisticadvocacy.org/' 
  },
  { 
    title: 'Tilt Parenting', 
    description: 'Explores the challenges and triumphs of parenting neurodivergent children, featuring interviews with experts, parents, and advocates.', 
    link: 'https://www.tiltparenting.com/podcast/' 
  },
  { 
    title: 'Neurodiversity Podcast', 
    description: 'Features conversations with neurodivergent individuals, researchers, and clinicians, covering various aspects of neurodiversity and its impact on daily life.', 
    link: 'https://neurodiversitypodcast.com/' 
  },
  { 
    title: 'Neurodiversity: Embracing the Difference by Thomas Armstrong', 
    description: 'Provides a comprehensive introduction to neurodiversity, exploring various neurodevelopmental conditions and their impact on individuals and society.', 
    link: 'https://www.amazon.com/Neurodiversity-Discovering-Extraordinary-Gifts-Autism/dp/0738215244' 
  },
  { 
    title: 'Spectrum (Netflix)', 
    description: 'A powerful documentary that explores the lives of autistic individuals and challenges common misconceptions about autism.', 
    link: 'https://www.netflix.com/title/81075408' 
  },
  { 
    title: 'Neurodiversity Celebration Week', 
    description: 'A global initiative that promotes understanding and acceptance of neurodiversity through educational events and resources.', 
    link: 'https://neurodiversityweek.com/' 
  },
  // Add more resources as needed
];

function ResourcesPage() {
  return (
    <div className='bg-[#EAD1CA] h-screen p-4'>
      <h1 className='font-bold mb-4 text-2xl'>Resources</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {resources.map((resource, index) => (
          <a href={resource.link} target='_blank' rel='noopener noreferrer' key={index}>
            <div className='bg-white rounded-xl h-48 p-4 shadow-lg cursor-pointer'>
              <h2 className='font-bold mb-2'>{resource.title}</h2>
              <p className='mb-2'>{resource.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ResourcesPage;