import Link from 'next/link';
export default function NotFound() {
  return (
    <div style={{textAlign:'center',padding:'8rem 1rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem'}}>
      <p style={{fontFamily:'var(--ff-caps)',fontSize:'.65rem',letterSpacing:'.3em',color:'var(--gold)',textTransform:'uppercase'}}>Error 404</p>
      <h1 style={{fontFamily:'var(--ff-display)',fontSize:'3rem',fontWeight:700,color:'var(--dark)'}}>Page Not Found</h1>
      <p style={{color:'var(--muted)',maxWidth:'400px',fontFamily:'var(--ff-body)'}}>The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="btn btn--primary" style={{marginTop:'1rem'}}>Back to Home</Link>
    </div>
  );
}
