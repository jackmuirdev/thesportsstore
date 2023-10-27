import { Helmet } from "react-helmet-async"

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to The Kellen Collection',
  description: 'We sell the best dance clothing and accessories',
  keywords: 'dancewear, danceclothes, kellencollection, dance, danceapparel, dancing, sportwear, sports'
}

export default Meta