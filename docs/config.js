// NextUp Configuration
// Update these values to customize your deployment
const NEXTUP_CONFIG = {
    // GitHub Repository Information
    github: {
        username: 'riturajratan',
        repository: 'NextUp',
        url: 'https://github.com/riturajratan/NextUp'
    },
    
    // Social Links
    social: {
        twitter: 'https://twitter.com/riturajratan',
        website: 'https://next-up.maddyzone.com'
    },
    
    // Project Information
    project: {
        name: 'NextUp',
        tagline: 'Ship Your Next.js App 10x Faster',
        description: 'Production-ready Next.js boilerplate with authentication, database, and beautiful UI components.',
        version: '1.0.0'
    },
    
    // Generated URLs
    get githubUrl() { return this.github.url },
    get templateUrl() { return `${this.github.url}/generate` },
    get starUrl() { return `${this.github.url}/stargazers` },
    get issuesUrl() { return `${this.github.url}/issues` },
    get authGuideUrl() { return `${this.github.url}/blob/main/AUTH_GUIDE.md` },
    get apiExamplesUrl() { return `${this.github.url}/tree/main/templates/app/api/examples` },
    get authHelpersUrl() { return `${this.github.url}/blob/main/templates/lib/auth-helpers.ts` },
    get customHooksUrl() { return `${this.github.url}/blob/main/templates/hooks/use-current-user.ts` }
}

// Make config globally available
window.NEXTUP_CONFIG = NEXTUP_CONFIG