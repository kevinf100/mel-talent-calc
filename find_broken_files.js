import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for the actual project
const targetDir = path.join(__dirname, 'src', 'core', 'data');

// Get all class directories
function getClassDirs() {
    try {
        return fs.readdirSync(targetDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        console.error(`❌ Error reading target directory: ${targetDir}`);
        return [];
    }
}

function findBrokenFiles() {
    console.log('🔍 FINDING FILES WITH MULTILINE STRING ISSUES\n');
    
    const classDirs = getClassDirs();
    const brokenFiles = [];
    
    classDirs.forEach(className => {
        const classDir = path.join(targetDir, className);
        
        try {
            const specFiles = fs.readdirSync(classDir)
                .filter(file => file.endsWith('.ts') && !file.startsWith('raw_'));
            
            specFiles.forEach(specFile => {
                const filePath = path.join(classDir, specFile);
                const relativePath = `${className}/${specFile}`;
                
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    
                    // Check for strings that contain actual newlines (not escaped)
                    // This happens when we have "text\n(actual newline)more text"
                    const lines = content.split('\n');
                    
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i].trim();
                        
                        // Check if line starts with a quote but doesn't end with a quote or comma
                        if (line.startsWith('"') && !line.endsWith('",') && !line.endsWith('"')) {
                            // This might be a multiline string
                            let j = i + 1;
                            let foundEnd = false;
                            
                            // Look for the closing quote
                            while (j < lines.length && !foundEnd) {
                                const nextLine = lines[j].trim();
                                if (nextLine.endsWith('"')) {
                                    foundEnd = true;
                                    
                                    // Check if there are any lines in between that are not empty
                                    for (let k = i + 1; k < j; k++) {
                                        const middleLine = lines[k].trim();
                                        if (middleLine !== '' && !middleLine.startsWith('//')) {
                                            brokenFiles.push({
                                                path: relativePath,
                                                line: i + 1,
                                                issue: 'Multiline string with actual newlines'
                                            });
                                            break;
                                        }
                                    }
                                    break;
                                }
                                j++;
                            }
                        }
                    }
                    
                } catch (error) {
                    console.log(`❌ Error reading ${relativePath}: ${error.message}`);
                }
            });
            
        } catch (error) {
            console.log(`❌ Error reading ${className} directory: ${error.message}`);
        }
    });
    
    if (brokenFiles.length > 0) {
        console.log('🚨 FOUND BROKEN FILES:');
        brokenFiles.forEach(file => {
            console.log(`  - ${file.path} (line ${file.line}): ${file.issue}`);
        });
    } else {
        console.log('✅ No broken files found');
    }
    
    return brokenFiles;
}

// Execute the search
const brokenFiles = findBrokenFiles();
console.log(`\nTotal broken files: ${brokenFiles.length}`);
